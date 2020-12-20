import React from 'react';
import { useParams } from 'react-router-dom';
const UserDetails = () => {
  let { userId } = useParams();
  return (
    <div>
      <div>{userId} - User Details Page</div>
    </div>
  );
};
export default UserDetails;
