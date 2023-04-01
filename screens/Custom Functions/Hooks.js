import { useEffect, useState, useRef, useCallback } from 'react';
import {onSnapshot } from "firebase/firestore";

export function useFirestoreQuery(query,refresh) {
    const [docs, setDocs] = useState([]);
  
 
    const queryRef = useRef(query);
  
    
    useEffect(() => {
    
      if (!queryRef?.curent?.isEqual(query)) {
        queryRef.current = query;
      }
    });
  
    useEffect(() => {
      if (!queryRef.current) {
        return null;
      }
      const unsubscribe = onSnapshot(queryRef.current,querySnapshot => {
        
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
       
        setDocs(data);
      });
  
      return unsubscribe;
    }, [queryRef,refresh]);
  
    return docs;
  }

  export function useSearchDebounce(delay = 350) {
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const delayFn = setTimeout(() => setSearch(searchQuery), delay);
      return () => clearTimeout(delayFn);
    }, [searchQuery, delay]);
  
    return [search, setSearchQuery];
  }