INSERT INTO users (user_name, user_email, user_image_url, password)
VALUES ('Mautzi', 'MolleMorallo@gmail.com', '', '!.Ba1234:!'),
('Mariana', 'BringMarianaBananaToSchool@gmail.com', '', '!.Ba1234:!'),
('Lena', 'lenintheempress@gmail.com', '', '!.Ba1234:!'),
('Björn', 'thPObutNotTheRiver@gmail.com', '', '!.Ba1234:!'),
('Pauline', 'DelphineQueen@gmail.com', '', '!.Ba1234:!'),
('Nick', 'nickTheSwan@gmail.com', '', '!.Ba1234:!'),
('Nico', 'intelligentButBeautiful@gmail.com', '', '!.Ba1234:!'),
('Simona', 'deepBeutifulSea@gmail.com', '', '!.Ba1234:!'),
('Beatriz', 'womanWhoRockTheWorld@gmail.com', '', '!.Ba1234:!'),
('Anahita', 'bestBiologistInTheWorld@gmail.com', '', '!.Ba1234:!'),
('Kaab', 'theCricketEnthusiast@gmail.com', '', '!.Ba1234:!'),
('Andres', 'krawalloAndi@gmail.com', '', '!.Ba1234:!'),
('Iko', 'caretaker3000@gmail.com', '', '!.Ba1234:!'),
('Taylor', 'sendMeJapaneseSweets@gmail.com', '', '!.Ba1234:!'),
('Gabe', 'teacherestOfThemAll@gmail.com', '', '!.Ba1234:!'),
('Franz', 'dontForgtTheHeap@gmail.com', '', '!.Ba1234:!'),
('Simon', 'paparrazzo8000@gmail.com', '', '!.Ba1234:!'),
('Valeria', 'iDesignYourBeautifulWebsite@gmail.com', '', '!.Ba1234:!'),
('Dan', 'theDarkPrince@gmail.com', '', '!.Ba1234:!');

INSERT INTO projects (project_title, project_image_url, project_description, project_goal, project_status, project_creator)
VALUES 
('Plan the graduation', 'https://pbs.twimg.com/profile_images/1134442245/images_400x400.jpeg', 'Plan the gradtuation party for the first code campers leipzig. Book amazing DJS and food and drinks that makes everyone happy. Also have a very nice venue and lets have the best evening ever!!!', 'Plan the best Party ever', 'open', 1),
('Plan the graduation trip', 'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fa0.muscache.com%2Fim%2Fpictures%2Fc72f90e4-22e3-4928-8d73-f8ee1b6f8958.jpg%3Faki_policy%3Dx_large', 'Plan the gradutaion trip to Napoli. book a wonderful beautiful house close to the sea, than plan what food you are going to eat, and plan what prosecco you are going to drink. also bring fun games and makeup', 'Make the best trip ever', 'open', 9),
('Code Camp Leipzig', 'https://uploads-ssl.webflow.com/58f76c68b8bb6a16cafdc9c3/5d2f455c3f4205621b065985_Code-Camp-Leipzig-Logo-klein.jpg', 'Teach 13 amazing interesting and wonderful people how to become realdevelopers. First teach them everything about the frontend. The html and css and js and ts and the ts and the angular. Then confuse them with travis and later teach them postgres which is fun! Shwo them how they conect it to each other and you are done. Of course also teach them how to work together with scrum. Cool ready go.', 'Get 13 developer', 'done', 14);
('Give free music lessons to schoolchildren', 'https://cdn.thestage.co.uk/wp-content/uploads/2016/07/Mayors-Music-Fund-credit-Paul-J-Cochrane.jpg', 'Are you interested in performing community service? Do you want examples of service projects you can do? Community service is a great way to help others and improve your community, and it can also help you gain skills and experience to include on your resume and college applications.', 'Help children interested in learning how to play an instrument. Open for people really passionate about music', 'open', 1);
('Help deliver meals and gifts to patients at a local hospital', 'https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2018/11/volunteering-rosies-place-thumb.jpg', 'Is there a specific group of people or cause you are passionate about? Look for projects that relate to your passion and interests. You may also just want to perform particular community service activities that allow you to do hobbies you enjoy, like baking or acting, and that is fine too.', 'Encourage people to donate their favorite food items.', 'open', 2);
('Create a new game for children to play', 'https://i.pinimg.com/originals/50/96/f6/5096f6a1ef89e2b786eff3325868730c.jpg', 'It may be better to look for opportunities that only occur once or sporadically, such as planning special events or helping build a house.', 'Some people prefer to participate in community service activities that have a quantifiable impact', 'open', 6);
('Christmas donations', 'https://www.worldvision.org/wp-content/uploads/Giving-tree_recipe-card-1.gif', 'Contact a tree farm about donating Christmas trees to nursing homes, hospitals, or to families who cannot afford to buy their own', 'Many community service activities can help you gain skills. These skills can range from teaching to medicine to construction and more.', 'open', 12);
('Community Garden for children', 'https://vcgn.org/wp-content/uploads/2014/12/HereWeHoeAgain-VNAFamilyRoomDayInTheDirt-Copy.jpg', 'Besides providing a motivating, hands-on setting for teaching skills in virtually every basic subject area, the garden is a wonderful place to learn responsibility, patience, pride, self-confidence, curiosity, critical thinking, and the art of nurturing.','Making a garden just for children, so they can learn about the process of gardening. It is a great educational opportunity.', 'open', 1);
('Blood donations', 'http://www.la.one.un.org/images/press-releases/UNV/_DSC3846_opt.jpg', 'By hosting a blood drive, our community can make a real difference. Red cross provides planning assistance, recruitment tools, equipment, supplies, and a trained staff to screen and collect donations safely.', 'Help advertise, recruit student, faculty and staff donors for the drives and assist during the drives to ensure that they run safely and smoothly.','open', 7);
('Cooking for homeless people', 'https://pcdn.columbian.com/wp-content/uploads/2018/11/1109_met_YOUTH-CARE-CENTER-1.jpg', 'Making a basic meal of warmth and comfort is easy to do. Importantly, it can help lift some of that burden from those folks and the shelters that help harbor them.','Prepare a home-cooked meal for the residents of a nearby homeless shelter','open', 10);


INSERT INTO tasks (project_id, task_title, task_description, task_status, task_creator, menu_section)
VALUES (1, 'Get Djs', 'ask Mariana and Lena to dj', 'open', 1, 'starter'),
(1, 'Order Champagne', 'make everyone happy. and ask Lena where to find the best Champagen in town', 'closed', 12,  'starter'),
(1, 'Buy a lot of Burger', 'Make everyone very happy. buy the best burger in town, but ask Gabe where to find them, because he knows', 'open', 7, 'starter'),
(2, 'Book the flight', 'look or the cheapest flights', 'delete', '9', 'starter'),
(2, 'Plan food', 'go through the most delicios receipts and look at all the picture and be excited for the food', 'open', 11, 'starter'),
(4, 'Find location for music classes', 'Contact facilities around town that might be willing to share their free space', 'closed', 1, 'starter'),
(4, 'Organize around getting instruments', 'Ask people for donations of their once-loved but no-longer-used musical instruments', 'open', 5, 'starter'),
(4, 'Help organize an outing to a local concert or performance', 'Check local listings to find performances appropriate for kids.','open', 3, 'starter'),
(5, 'Contact local food bank', 'Gather necessary information and materials to have a food drive.', 'open', 2, 'starter'),
(5, 'Promote our food drive', 'Offer prizes to individuals who donate the most.', 'open', 8, 'starter');
(6, 'Some people prefer quantifiable activities because they feel they look stronger on college applications', 'Many community service activities can help you gain skills. These skills can range from teaching to medicine to construction and more.', 'open', 6, 'starter');
(6, 'Write articles and give speeches advocating financial literarcy.', 'First you should learn about the topics themselves, like calculating housing costs, or understanding personal loans, and then give presentations on these topics.', 'open', 13, 'starter');
(7, 'Buy Christmas trees and distribute them to needy individuals', 'spread hope and joy by giving Christmas trees to families in need. We are just neighbors helping neighbors, building a little community and spreading good cheer in the process. Want to join the Santas?', 'open', 12, 'starter');
(7, 'Hold a fundraiser.', 'Find bands willing to perform sing-alongs. Christmas caroling has never been this much fun!', 'open', 15, 'starter');
(8, 'Form a planning committee for preliminary decisions', 'Identify and invite leaders within the community and other interested people to an organizational meeting and social gathering.', 'open', 1, 'starter');
(8, 'Choose a name for the garden.', 'Create a prioritized budget and a wish list of desired donations and update it regularly', 'open', 5, 'starter');
(8, 'Decide on the scope of garden including the size and the components', 'Make management decisions including whether there will be any restrictions on the use of pesticides and fertilizers. ', 'open', 13, 'starter');
(9, 'Check in donors as they arrive at the drive.', 'Find bands willing to perform sing-alongs. Christmas caroling has never been this much fun!', 'open', 15, 'starter');
(10, 'Ask businesses for their leftovers.', 'Try finding philanthropic restaurants and ask them if you can use their kitchen to prepare meals when they are closed', 'open', 7, 'starter');



INSERT INTO user_project (user_id, project_id)
VALUES (1, 1),
(2, 1),
(6, 1),
(3, 1),
(8, 1),
(9, 1),
(10, 1),
(12, 1),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(13, 2),
(11, 2),
(14, 3),
(15, 3),
(16, 3),
(17, 3),
(18, 3),
(19, 3),
(1, 4),
(5, 4),
(3, 4),
(18, 4),
(11, 4),
(2, 5),
(8, 5),
(13, 5),
(6, 6),
(13, 6),
(15, 6),
(3, 6),
(15, 7),
(12, 7),
(1, 8),
(13, 8),
(7, 9),
(15, 9),
(10, 10),
(7, 10);


INSERT INTO user_task (user_id, task_id)
VALUES (2,1),
(3, 1),
(1, 2),
(2, 2),
(4, 3),
(5, 3),
(9, 3),
(10, 3),
(6, 4),
(7, 4),
(8, 4),
(9, 5),
(11, 5),
(12, 5),
(8, 6),
(9, 6),
(11, 6),
(10, 7),
(11, 8),
(5, 9),
(7, 10),
(9, 10),
(13, 11),
(15, 11),
(3, 12),
(15, 13),
(12, 13),
(12, 14)
(1, 15),
(1, 15),
(5, 16),
(13, 17),
(7, 18),
(10, 19);

