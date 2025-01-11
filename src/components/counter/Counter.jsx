import { useSelector, useDispatch } from "react-redux";
import { addOne, munisOne, setName } from "./CounterSlice";

function Counter() {
  const data = useSelector((state) => state.counterData);
  const dispatch = useDispatch();

  const addNum = () => {
    dispatch(addOne());
  };
  const munisNum = () => {
    dispatch(munisOne());
  };
  const changeName = () => {
    dispatch(setName("mohsen"));
  };

  return (
    <>
      <button onClick={addNum} className="btn btn-sm btn-outline-info">
        +
      </button>
      <span className="mx-2 text-info">{data.count}</span>
      <button onClick={munisNum} className="btn btn-sm btn-outline-info ">
        -
      </button>

      {/* <input
        type="text"
        className="form-control form-control-sm mt-1 w-auto"
        value={data.name}
      /> */}

      {/* <button onClick={changeName} className="btn btn-sm btn-outline-info ">
        Change Name
      </button> */}
    </>
  );
}

export default Counter;
