const User = require('../models/User');

const createAdminUser = async () => {
    try {
        const admin = await User.findOne({ where: { username: 'admin' } });
        if (!admin) {
            await User.create({
                username: 'admin',
                name: 'Admin',
                email: 'admin@gmail.com',
                password: 'Admin00@',
                role: 'ADMIN',
            });
            console.log('Admin user created successfully with username: admin and password: Admin00@ , please change the password immediately after login');
        }
    } catch (error) {
        console.log('Error creating admin user:', error);
    }
}

module.exports = createAdminUser;