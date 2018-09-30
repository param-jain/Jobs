import axios from 'axios';

import {
    FETCH_JOBS,
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from './types';
 
/*
import JOB_DATA from '../IndeedJobData.json';
 
const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};
 
 
export const fetchJobs = (region, callback) => async (dispatch) => {
    try{
        let zip = await reverseGeocode(region);
        console.log('zip', zip);
        const url = buildJobsUrl(zip);
        console.log(url);
        // let { data } = await axios.get(url);
        dispatch({type: FETCH_JOBS, payload: JOB_DATA });
        callback();
    } catch (e) {
        console.error(e);
    }
};
 
export const clearFetchedJobs = () => {
    return {
        type: CLEAR_FETCHED_JOBS
    }
}; */
 

const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?';

export const fetchJobs = ({longitude, latitude}, callback) => {
 
    return async (dispatch) => {
        try {
            const url = `${JOB_ROOT_URL}lat=${latitude}&long=${longitude}`;
 
            let { data } = await axios.get(url);
            
            dispatch({
                type: FETCH_JOBS,
                payload: data
            });

            callback();
            
            console.log(data);

        } catch (err) {
            console.log("Something went wrong... ", err);
        }
    }
};

export const likeJob = (job) => {
    return {
        payload: job,
        type: LIKE_JOB
    }
}

export const clearLikedJobs = () => {
    return { type: CLEAR_LIKED_JOBS };
};

/*

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const JOB_QUERY_PARAMS = {
    publisher: 4201738803816157,
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

const buildJobsUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${JOB_ROOT_URL}${query}`;
}

export const fetchJobs = (region) => async (dispatch) => {
    try {
        let zip = await reverseGeocode(region);
        const url = buildJobsUrl(zip);
        let { data } = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data });
        console.log(data);
    } catch (e) {
        console.error(e);
    }
}; */