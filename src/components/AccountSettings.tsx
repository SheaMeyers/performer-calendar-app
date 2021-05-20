import React, { useState } from 'react';
import '../css/AccountSettings.css';
import SearchPerformers from './SearchPerformers';
import Button from '@material-ui/core/Button';


const AccountSettings = () => {
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    
    return (
        <div className="Account-Settings-Container">
            <div className="Account-Settings">
                <h2>Account Settings</h2>
                <SearchPerformers />
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

export default AccountSettings;
