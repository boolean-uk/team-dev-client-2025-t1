import { useState } from 'react';
import SearchIcon from '../../assets/icons/searchIcon';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import TextInput from '../../components/form/textInput';
import Posts from '../../components/posts';
import useModal from '../../hooks/useModal';
import './style.css';
import { useEffect } from 'react';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
  const [data, setData] = useState(['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Bob', 'Charlie', 'David', 'Eve', 'Bob', 'Charlie', 'David', 'Eve']);

  useEffect(() => {
    // Fetch data from an API
    // setData(response.data);
  }), []};

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(searchVal.toLowerCase())
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
            <div className="profile-icon">
              <p>AJ</p>
            </div>
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
                  <li key={index}>{item}</li>
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
