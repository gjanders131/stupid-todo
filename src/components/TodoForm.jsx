import { useForm } from "react-hook-form";
import uuid from "react-uuid";

const randNum = (max) => {
  if (Math.random() < 0.5) {
    return Math.random() * max;
  } else {
    return -(Math.random() * max);
  }
};

const randColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return [r, g, b];
};

const TodoForm = ({ todo, setTodo }) => {
  const { register, handleSubmit } = useForm();
  const maxRange = 5;
  const onSubmit = (data, e) => {
    data.color = randColor();
    data.id = uuid();
    data.pos = [randNum(maxRange), randNum(maxRange), 0];
    data.rot = randNum(0.3);
    setTodo([...todo, data]);
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("content", { required: true })}
          placeholder="New Todo"
        />
        <label>
          <button type="submit">Add ToDo</button>
        </label>
      </form>
    </div>
  );
};

export default TodoForm;
