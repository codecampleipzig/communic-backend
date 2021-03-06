import { Request, Response, NextFunction } from "express";
import { query } from "../db";
import { QueryResult } from "pg";
import { Project } from "src/datatypes/Project";

function calculateSqlParamValue(param: string) {
  return `%${param}%`.toLowerCase();
}

async function searchForProjects(searchTermQueryParam: string, limit: number, offset: number) {
  let dbResponse: QueryResult<Project>;
  function specifyPagination(limit: number, offset: number) {
    return `LIMIT ${limit} OFFSET ${offset}`;
  }
  if (!searchTermQueryParam) {
    dbResponse = await query("SELECT * from projects");
  } else {
    const searchTermQueryParamToArray = searchTermQueryParam.split(" ");

    let queryString = "SELECT * from projects";
    for (let i = 0; i < searchTermQueryParamToArray.length; i++) {
      let queryCondition;
      if (i == 0) {
        queryCondition = ` WHERE LOWER(project_title) LIKE $${i + 1}`;
      } else {
        queryCondition = ` AND LOWER(project_title) LIKE $${i + 1}`;
      }
      queryString = queryString + queryCondition;
      searchTermQueryParamToArray[i] = calculateSqlParamValue(searchTermQueryParamToArray[i]);
    }

    dbResponse = await query(queryString + specifyPagination(limit, offset), searchTermQueryParamToArray);
  }
  return dbResponse;
}

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchTermQueryParam = req.query.searchTerm;
    if (Array.isArray(searchTermQueryParam)) {
      return res.status(400).send({ message: "Only one search term parameter allowed" });
    }
    let limitParam = req.query.limit;
    let offsetParam = req.query.offset;

    if (!limitParam) {
      limitParam = "20";
    }
    if (!offsetParam) {
      offsetParam = "0";
    }
    const limitParamNum = parseInt(limitParam);
    const offsetParamNum = parseInt(offsetParam);

    if (Number.isNaN(limitParamNum) || limitParamNum < 0) {
      return res.status(400).send({ message: "Limit has to be a non-negative number" });
    }
    if (Number.isNaN(offsetParamNum) || offsetParamNum < 0) {
      return res.status(400).send({ message: "Offset has to be a non-negative number" });
    }

    const dbResponse: QueryResult<Project> = await searchForProjects(
      searchTermQueryParam,
      limitParamNum,
      offsetParamNum,
    );
    res.send({ projects: dbResponse.rows });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get Project from db
    const project = await query("SELECT * from projects WHERE project_id = $1", [req.params.projectId]);

    // Get Project Creator from db and replace ID with actual infos in project object
    const projectCreatorId = project.rows[0].projectCreator;
    const projectCreator = await query(
      "SELECT u.user_id, u.user_name, u.user_email, u.user_image_url from users u WHERE user_id = $1",
      [projectCreatorId],
    );
    project.rows[0].projectCreator = projectCreator.rows[0];

    // Get projectTeam from db and append to project object
    const projectTeam = await query(
      `SELECT u.user_id, u.user_name, u.user_email, u.user_image_url from user_project up 
      JOIN users u ON up.user_id = u.user_id
      WHERE up.project_id = $1
      ORDER BY up.user_join_date asc`,
      [req.params.projectId],
    );
    project.rows[0].projectTeam = projectTeam.rows;

    // Get Sections and add to project object
    const sections = await query(`SELECT * FROM sections WHERE project_id = $1 ORDER BY section_init_date DESC`, [
      req.params.projectId,
    ]);
    project.rows[0].projectSections = [];

    for (const section of sections.rows) {
      // Get Section Creator and replace it in element
      const sectionCreatorId = section.sectionCreator;
      const sectionCreator = await query(
        "SELECT u.user_id, u.user_name, u.user_email, u.user_image_url from users u WHERE user_id = $1",
        [sectionCreatorId],
      );
      section.sectionCreator = sectionCreator.rows[0];

      // Get Tasks and tasksTeams and append to element
      const tasks = await query(
        `SELECT * from tasks 
        WHERE section_id = $1 
        ORDER BY task_status DESC`,
        [section.sectionId],
      );
      // Create empty array in every task
      for (let i = 0; i < tasks.rows.length; i++) {
        // Get Task Creator and replace it in element
        const taskCreatorId = tasks.rows[i].taskCreator;
        const taskCreator = await query(
          "SELECT u.user_id, u.user_name, u.user_email, u.user_image_url from users u WHERE user_id = $1",
          [taskCreatorId],
        );
        tasks.rows[i].taskCreator = taskCreator.rows[0];
        // Create empty array in every task
        tasks.rows[i].taskTeam = [];
      }
      const tasksTeams = await query(
        `SELECT t.task_id, u.user_id, u.user_name, u.user_email, u.user_image_url from tasks t
        JOIN user_task ut ON t.task_id = ut.task_id
        JOIN users u ON u.user_id = ut.user_id
        WHERE section_id = $1
        ORDER BY ut.user_join_date asc`,
        [section.sectionId],
      );
      // Loop through tasks and put every user by task into element
      tasksTeams.rows.forEach(teamElement => {
        const { taskId } = teamElement;
        delete teamElement.taskId;
        tasks.rows.find(t => t.taskId == taskId).taskTeam.push(teamElement);
      });
      section.projectTasks = tasks.rows;

      // Put element into projectSections
      project.rows[0].projectSections.push(section);
    }

    if (project.rows.length == 1) {
      res.send({ project: project.rows[0] });
    } else {
      res.status(404).send({ error: "Project not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const title = body.title;
    const imageUrl = body.imageUrl;
    const description = body.description;
    const goal = body.goal;
    const status = 'open';
    const creator = parseInt(body.creator);
    if (!title || !imageUrl || !description  || !goal || !status || Number.isNaN(creator)) {
      res.status(500).send("Not a valid project");
    }

    const dbResponse = await query(
      `INSERT INTO projects(project_title, project_image_url, project_description, project_goal, project_status, project_creator) 
      VALUES($1, $2, $3, $4, $5, $6) RETURNING project_id`,
      [title, imageUrl, description, goal, status, creator],
    );

    const projectId = dbResponse.rows[0].projectId;

    // add creator to project
    await query(
      `INSERT INTO user_project (user_id, project_id)
      VALUES($1, $2) RETURNING *`,
      [creator, projectId]
    );

    res.send({projectId});
  } catch (error) {
    next(error);
  }
};

//
export const getUserProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.userId;
    const dbResponse = await query(
      `SELECT projects.project_id, project_title, project_description, project_image_url, project_goal, project_creator, project_status FROM projects
    WHERE EXISTS
      (SELECT * from user_project
        WHERE project_id = projects.project_id AND user_id = $1
        ORDER BY user_join_date asc) `,
      [id],
    );
    res.send({ projects: dbResponse.rows });
  } catch (error) {
    next(error);
  }
};

export const getExploreProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.userId;
    const dbResponse = await query(
      `SELECT projects.project_id, project_title, project_description, project_image_url, project_goal, project_creator, project_status FROM projects
    WHERE NOT EXISTS
      (SELECT * from user_project
        WHERE project_id = projects.project_id AND user_id = $1)`,
      [id],
    );
    res.send({ projects: dbResponse.rows });
  } catch (error) {
    next(error);
  }
};

export const addTeamMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId, userId } = req.params;

    const dbResponse = await query(
      `INSERT INTO user_project (project_id, user_id) 
      VALUES ($1, $2)`,
      [projectId, userId],
    );
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteTeamMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId, userId } = req.params;

    const dbResponse = await query(
      `DELETE FROM user_project up
      WHERE up.project_id = $1 AND up.user_id = $2`,
      [projectId, userId],
    );

    next();
  } catch (error) {
    next(error);
  }
};
