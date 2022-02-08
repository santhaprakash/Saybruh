import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Feed1 from '../Phonecomponents/Feed1';
import Feed2 from '../Phonecomponents/Feed2';
import Feed3 from '../Phonecomponents/Feed3';
import { onSnapshot, query, where } from "firebase/firestore";
import { tempcollect } from "../firebase";
function Feed() {
  return (
  <>
<Feed1 />
<Feed2 />
<Feed3 />
  </>
    );
}

export default Feed;
