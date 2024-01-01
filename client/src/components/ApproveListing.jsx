// ApproveListing.js

import { useState } from 'react';

const ApproveListing = ({ itemId, approved }) => {
  const [isApproved, setIsApproved] = useState(approved || false);

  const handleApprove = async () => {
    try {
      // Make a request to your Express.js server to add the item to the favorites list
      const response = await fetch('/api/listing/approve/'+ itemId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, approved: !isApproved}),
      });

      if (response.ok) {
        // Update the state to reflect that the item is now favorited
        setIsApproved(!isApproved);
      } else {
        console.error('Failed to Approve item:', response.statusText);
      }
    } catch (error) {
      console.error('Error Approve item:', error);
    }
  };

  return (
    <div>
      <span onClick={handleApprove} style={{ cursor: 'pointer' }}>
        {isApproved ? <p className='text-lg text-lightblue'>Approved</p> :  <p className='text-lg '>Approve</p>}
      </span>
    </div>
  );
};

export default ApproveListing;
