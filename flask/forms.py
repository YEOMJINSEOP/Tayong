from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, Email, EqualTo

class RegisterForm(FlaskForm):
    username =  StringField("Username", 
                            validators=[DataRequired(), Length(min=4, max=20)])
    email =  StringField("Email", 
                            validators=[DataRequired(), Email()])
    password = PasswordField("Password", 
                            validators=[DataRequired(), Length(min=4, max=20)])
    confirm_password = PasswordField("Password", 
                            validators=[DataRequired(), EqualTo("password")] )
    confirm = PasswordField('Confirm Password')
