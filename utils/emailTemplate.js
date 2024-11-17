const taskReminderTemplate = (task) => {
    return `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">Task Reminder</h2>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #e74c3c; margin-top: 0;">${task.title}</h3>
            <p style="color: #34495e; line-height: 1.6;">
                ${task.description || 'No description provided'}
            </p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0; color: #7f8c8d;">
                <strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleString()}
            </p>
        </div>
        
        <div style="background-color: #e8f4f8; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #2980b9;">
                Please complete this task before the due date. If you need any clarification, please reach out to the team.
            </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #95a5a6;">
            <p>This is an automated notification. Please do not reply to this email.</p>
        </div>
    </div>
    `;
};

module.exports = {
    taskReminderTemplate
};
