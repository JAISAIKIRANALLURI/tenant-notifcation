const nodemailer = require('nodemailer');
const { taskReminderTemplate } = require('./emailTemplate');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendTaskReminder(task) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: task.participants.join(', '),
                subject: `Task Reminder: ${task.title}`,
                html: taskReminderTemplate(task)
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.messageId);
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }
}

module.exports = new EmailService();