-- Seed data for SOH Foundation website

-- Insert sample gallery items
INSERT INTO gallery (title, description, event_date, location, image_url) VALUES
('Children''s Day Celebration', 'Joyous celebration bringing together children from Noble Kings Academy and LEA Primary School Dutse with educational activities, games, and nutritious meals.', '2024-05-23', 'Noble Kings Academy & LEA Primary Dutse', '/placeholder.svg?height=300&width=400'),
('Skill Acquisition Program', 'Empowerment initiative targeting adolescent girls in the Bmuko community with practical skills training including tailoring, crafts, and entrepreneurship.', '2024-08-29', 'Bmuko Community', '/placeholder.svg?height=300&width=400'),
('Community Health Outreach', 'Providing healthcare services and health education to underserved communities with medical checkups and awareness campaigns.', '2024-07-15', 'Rural Health Center', '/placeholder.svg?height=300&width=400'),
('Educational Material Distribution', 'Distributing books, supplies, and learning materials to students in need across multiple schools in the region.', '2024-06-10', 'Multiple Schools', '/placeholder.svg?height=300&width=400'),
('Nutrition Program Launch', 'Launching comprehensive feeding program to address malnutrition in vulnerable children with daily nutritious meals.', '2024-04-20', 'Community Center', '/placeholder.svg?height=300&width=400'),
('Women''s Empowerment Workshop', 'International Women''s Day workshop focusing on leadership development and economic empowerment for women in the community.', '2024-03-08', 'Women''s Center', '/placeholder.svg?height=300&width=400');

-- Insert sample services
INSERT INTO services (title, description, event_date, location, category) VALUES
('Children''s Day Celebration', 'A joyous celebration bringing together children from Noble Kings Academy and LEA Primary School Dutse. The event featured educational activities, games, entertainment, and nutritious meals for over 300 children.', '2024-05-23', 'Noble Kings Academy & LEA Primary Dutse', 'Education'),
('Skill Acquisition Program', 'An empowerment initiative targeting adolescent girls in the Bmuko community. The program focused on practical skills training including tailoring, crafts, basic entrepreneurship, and financial literacy.', '2024-08-29', 'Bmuko Community', 'Empowerment'),
('EDUCATE Program', 'Providing quality education and learning opportunities to children and adults in underserved communities through school infrastructure development, teacher training, and educational material distribution.', '2023-01-01', 'Multiple Locations', 'Education'),
('EMPOWER Program', 'Empowering individuals and communities through skill acquisition, vocational training, and economic opportunities with focus on building capacity and creating pathways to self-sufficiency.', '2023-01-01', 'Multiple Locations', 'Empowerment'),
('INNOVATE Program', 'Fostering innovation and creative solutions to address community challenges through technology adoption, sustainable practices, and community-led initiatives.', '2023-01-01', 'Multiple Locations', 'Innovation');

-- Insert sample testimonials
INSERT INTO testimonials (name, role, quote, rating) VALUES
('Babatunde Naomi Tinuoluwa', 'Community Leader', 'Stone of Help Foundation has been a beacon of hope in our community. Their dedication to education and empowerment has transformed countless lives. The Children''s Day celebration they organized brought so much joy to our children and reminded us of the importance of investing in our future generation.', 5),
('Faith Oluwatomi', 'Program Beneficiary', 'The skill acquisition program changed my life completely. I learned valuable skills that have enabled me to start my own small business and support my family. The foundation didn''t just teach us skills; they gave us hope and the confidence to believe in ourselves. I am forever grateful for their support.', 5);

-- Insert admin user (password should be hashed in real application)
INSERT INTO admin_users (email, password_hash, role) VALUES
('admin@sohfoundation.com', '$2b$10$example_hash_here', 'admin');
