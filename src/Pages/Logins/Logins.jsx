// import React from "react";
// import PropTypes from "prop-types";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import "./Logins.scss"

// export default function Home({ todos, handleUpdate, handleDelete }) {
//   return (
//     <div className="Logins">
//       {todos.map((todo) => (
//         <div className="todo" key={todo.uidd}>
//           <h1>{todo.todo}</h1>
//           <p>{todo.email}</p>
//           <EditIcon
//             fontSize="large"
//             onClick={() => handleUpdate(todo)}
//             className="edit-button"
//           />
//           <DeleteIcon
//             fontSize="large"
//             onClick={() => handleDelete(todo.uidd)}
//             className="delete-button"
//           />
//         </div>
//       ))}

    
//     </div>
//   );
// }

// Home.propTypes = {
//   todos: PropTypes.array.isRequired,
//   handleUpdate: PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired,
// };