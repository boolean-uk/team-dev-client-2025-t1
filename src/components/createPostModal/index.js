import { useState, useContext } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';
import Button from '../button';
import { LoginContext } from '../../App';

const CreatePostModal = () => {
  // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
  const { closeModal } = useModal();
  const { loggedInAs } = useContext(LoginContext);

  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    setMessage('Submit button was clicked! Closing modal in 2 seconds...');

    setTimeout(() => {
      setMessage(null);
      closeModal();
    }, 2000);
  };

  return (
    <>
      <section className="create-post-user-details">
        <div className="profile-icon">
          <p>{`${loggedInAs.firstName[0]}${loggedInAs.lastName[0]}`}</p>
        </div>
        <div className="post-user-name">
          <p>{`${loggedInAs.firstName} ${loggedInAs.lastName[0]}`}</p>
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={text} placeholder="What's on your mind?"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text="Post"
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default CreatePostModal;
