import axios from "axios";

export const getAllTodos = async () => {
  try {
    const data = axios.get(`http://localhost:4000/todos`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createTodo = async (todo) => {
  try {
    console.log("todod", todo);
    const data = axios.post(`http://localhost:4000/todos`, todo);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteTodo = async (id) => {
  try {
    const data = axios.delete(`http://localhost:4000/todos/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
