import React from 'react';
import { useSession } from '../../context/SessionContext';

const Profile = () => {
    const { session, role, userid } = useSession();

    if (!session) return <p>Please log in.</p>;

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2>My Profile</h2>
            <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
                <p><strong>User ID:</strong> {userid}</p>
                <p><strong>Role:</strong> {role}</p>
                <p><strong>Status:</strong> Active</p>
                {/* 
                    Here we would fetch more user details (name, email, resume) from Auth Service or Profile Service if extended. 
                    For now, showing basic session info.
                */}
            </div>
        </div>
    );
}

export default Profile;
