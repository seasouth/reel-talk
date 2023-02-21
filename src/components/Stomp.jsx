import React from 'react';
import SockJsClient from 'react-stomp';

const Stomp = () => {
    return (
        <div>
            <SockJsClient url='http://localhost:8080/ws' topics={['/topics/all']}
                onMessage={(msg) => { console.log(msg); }}
                //ref={ (client) => { clientRef = client }} 
            />
        </div>
    );
}

export default Stomp