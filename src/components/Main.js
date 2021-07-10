// import { addBadResError, addSuccess, resetTester } from "actions";
// import { SUCCESS } from "constants/ActionTypes";
import { /*  useDispatch, */ useSelector } from "react-redux";

const Main = () => {
  // const dispatch = useDispatch();
  const { /* testedItems, */ passed } = useSelector((state) => state.tester);

  /*  const handleClick = () => dispatch(addSuccess("GET - User", "done"));
  const handleClickError = () =>
    dispatch(addBadResError("GET - User", "Such an error"));

  const handleClickRest = () => dispatch(resetTester());
 */
  return (
    <div>
      <div>passed: {passed}</div>
      {/* 
      {testedItems
        .filter((item) => item.type === SUCCESS)
        .map((item, i) => (
          <div key={i}>
            Success: {item.api} {i}
          </div>
        ))}
      <hr />
      {testedItems
        .filter((item) => item.type !== SUCCESS)
        .map((item, i) => (
          <div key={i}>
            Error: {item.api} {i}
          </div>
        ))}
      <button onClick={handleClick}>success</button>
      <button onClick={handleClickError}>error</button>
      <button onClick={handleClickRest}>reset</button> */}
    </div>
  );
};

export default Main;
