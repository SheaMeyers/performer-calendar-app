import React, { useState } from 'react';
import '../css/AccountSettings.css';
import Button from '@material-ui/core/Button';


const UpdatePassword = () => {
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    
    return (
        <div className="Account-Settings-Container">
            <div className="Account-Settings">
                <h2>Account Settings</h2>
                <Button variant="contained">
                    Change Password
                </Button>
                <Button variant="contained" color="primary">
                    Logout
                </Button>
            </div>
        </div>
    )

}

export default UpdatePassword;
