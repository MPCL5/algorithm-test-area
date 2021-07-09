import { addBadResError, addSuccess, resetTester } from "actions";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();
  const { tested, error, successes } = useSelector((state) => state.tester);

  const handleClick = () => dispatch(addSuccess("GET - User", "done"));
  const handleClickError = () =>
    dispatch(addBadResError("GET - User", "Such an error"));

  const handleClickRest = () => dispatch(resetTester());

  return (
    <div>
      <div>tested: {tested}</div>
      {successes.map((item, i) => (
        <div key={i}>
          {item.message} {i}
        </div>
      ))}
      <hr />
      {error.map((item, i) => (
        <div key={i}>
          {item.message} {i}
        </div>
      ))}
      <button onClick={handleClick}>success</button>
      <button onClick={handleClickError}>error</button>
      <button onClick={handleClickRest}>reset</button>
    </div>
  );
};

export default Main;
