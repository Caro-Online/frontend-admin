import React from 'react';
import { useParams } from 'react-router-dom';
const MatchDetails = () => {
  let { matchId } = useParams();
  return (
    <div>
      <div>{matchId} - Match Details Page</div>
    </div>
  );
};
export default MatchDetails;
