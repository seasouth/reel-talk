import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Comment from './Comment';
import './Comments.css';

const Take = ({
    auth,
    username,
    openReply,
    itemId,
    currentId,
    handleSetCurrentId,
    handleOnReplyButton
}) => {
    const [text, setText] = useState("");
    const [readOnly, setReadOnly] = useState(false);

    const submitComment = () => {
        let comment = {
            commenter: username,
            commentText: text,
            threadId: itemId,
            commentId: currentId
        }
        console.log(comment);
        axios.post("http://localhost:8080/comment/save", comment)
            .then((response) => {
                console.log(response);
                handleSetCurrentId();
                setReadOnly(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>{
            openReply ? 
            <div>
                <div
                    style={{display: 'flex'}}
                >
                    <div
                        className='comment-indent'
                    >
                        |
                    </div>
                    {
                        readOnly ? 
                        <Comment 
                            username={auth.username}
                            commentText={text}
                            onReplyButton={handleOnReplyButton}
                        />
                        :
                        <textarea
                            disabled={readOnly}
                            className="form-control"
                            placeholder="Comment"
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                        />
                    }
                </div>
                {!readOnly && <button
                    onClick={submitComment}
                >
                    Submit button
                </button>}
            </div> : 
            <></>
        }</div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

Take.propTypes = {
    handleSetCurrentId: PropTypes.func
}

export default connect(mapStateToProps)(Take);