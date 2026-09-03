import React from 'react';

const FooterLanding: React.FC = () => {
    return (
        <footer className="bg-black text-white py-2">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} evento. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default FooterLanding;