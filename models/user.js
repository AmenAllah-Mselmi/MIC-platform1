const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const schema = mongoose.Schema;

const UserSchema = new schema({
    NomPrenom: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    Role:{
        type:String,
        enum:['super_admin','member','instructor']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    Adresse: {
        type: String,
        required: true
    },
    ImageLink:{
        type:String
    }
});


UserSchema.pre('save', async function(next) {
    if (!this.isModified('Password')) {
        return next();
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.Password = await bcrypt.hash(this.Password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", UserSchema);

const InstructorSchema = new schema({
    Departement:{
        type:String,
        enum:['Basic','Intermediate','Advanced']
    }
});

const MemberSchema = new schema({
    Departement:{
        type:String,
        enum:['Basic','Intermediate','Advanced']
    }
});
const Instructor = User.discriminator('Instructor', InstructorSchema);


const SuperAdmin = User.discriminator('SuperAdmin', new schema({}));


const Member = User.discriminator('Member',MemberSchema);

module.exports = { User, Instructor, SuperAdmin, Member };
