const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    participants: [{
        type: String,
        required: true,
        validate: {
            validator: function(email) {
                return /\S+@\S+\.\S+/.test(email);
            },
            message: 'Invalid email format'
        }
    }],
    notificationSent: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);