import axios from 'axios'

export const queryDate = async(values) =>
    await axios.post(process.env.REACT_APP_API+'/dashboard',values)

export const chartDate = async(values) =>
    await axios.post(process.env.REACT_APP_API+'/chart',values)
    
export const createEvent = async(values) =>
    await axios.post(process.env.REACT_APP_API+'/event',values)

export const listEventwithcon = async(values) =>
    await axios.post(process.env.REACT_APP_API+'/listevent',values)

export const listEvent = async() =>
    await axios.get(process.env.REACT_APP_API+'/event')

export const handlecurrentMonth = async(values) =>
    await axios.post(process.env.REACT_APP_API+'/current-month',values)

export const updateEvent = async(values) =>
    await axios.put(process.env.REACT_APP_API+'/event',values)

export const deleteEvent = async(values) =>
    await axios.delete(process.env.REACT_APP_API+'/event/' + values)

export const checkUser = async(values) =>
    await axios.post(process.env.REACT_APP_API+'/listuser',values)

export const createUser = async(values) =>
    await axios.post(process.env.REACT_APP_API+'/cuser',values)
