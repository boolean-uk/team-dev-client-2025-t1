import { useContext, useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/searchIcon';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import TextInput from '../../components/form/textInput';
import Posts from '../../components/posts';
import useModal from '../../hooks/useModal';
import './style.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../App';
import { getUsers } from '../../service/apiClient';
import ProfileCircle from '../../components/profileCircle';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
  const { loggedInAs } = useContext(LoginContext);
  const [data, setData] = useState([]);

  console.log(loggedInAs);
  const onChange = (e) => {
    setSearchVal(e.target.value);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
    async function fetchData() {
      const res = await getUsers();
      const filteredRes = res.filter((user) => user.firstName && user.lastName);
      setData(filteredRes);
    }
  }, []);

  const filteredData = data.filter((item) =>
    item.firstName.toLowerCase().includes(searchVal.toLowerCase())
  );

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal('Create a post', <CreatePostModal />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
    openModal();
  };

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <Link to={`/profile/${loggedInAs.id}`}>
              <div className="profile-icon">
                <p>{`${loggedInAs.firstName[0]}${loggedInAs.lastName[0]}`}</p>
              </div>
            </Link>
            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts />
      </main>

      <aside>
        <Card>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextInput icon={<SearchIcon />} value={searchVal} name="Search" onChange={onChange} />
            {searchVal && (
              <ul>
                {filteredData.map((item, index) => (
                  <li key={index}>
                    <section className="post-details">
                      <ProfileCircle initials={item.firstName[0] + item.lastName[0]} />

                      <div className="post-user-name">
                        <p>
                          {item.firstName} {item.lastName}
                        </p>
                      </div>
                    </section>

                    <section className="post-content"></section>
                  </li>
                ))}
              </ul>
            )}
          </form>
        </Card>

        <Card>
          <h4>My Cohort</h4>
        </Card>
      </aside>
    </>
  );
};

export default Dashboard;
