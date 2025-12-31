const axios = require('axios');

// Configuration
const API_URL = 'https://vtct.onrender.com/api/auth/create-admin'; // Using deployed URL
const ADMIN_SECRET = 'vtc_admin_secret'; // Default secret from code

// New Admin Credentials
const newAdmin = {
    name: 'New Admin',
    email: 'newadmin@vtc.com',
    password: 'newpassword123',
    adminSecret: ADMIN_SECRET
};

async function createAdmin() {
    try {
        console.log('Creating new admin user...');
        const response = await axios.post(API_URL, newAdmin);

        if (response.data.success) {
            console.log('✅ Admin user created successfully!');
            console.log('-----------------------------------');
            console.log('Email:', newAdmin.email);
            console.log('Password:', newAdmin.password);
            console.log('-----------------------------------');
            console.log('You can now log in with these credentials.');
        } else {
            console.log('❌ Failed to create admin:', response.data.message);
        }
    } catch (error) {
        console.error('❌ Error:', error.response ? error.response.data : error.message);
    }
}

createAdmin();
