import React from "react";

function TodoRows(props) {
  const [buttonValue, setButtonValue] = React.useState("Update");
  const [description, setDescription] = React.useState(props.description);
  const [deadline, setDeadline] = React.useState(props.deadline);
  const [textInput, setTextInput] = React.useState(props.description);
  const [deadlineInput, setDeadlineInput] = React.useState(props.deadline);

  const updateDescription =
    buttonValue === "Update" ? (
      <input
        type="text"
        onChange={(e) =>
          setTextInput(
            e.target.value.length > 0 ? e.target.value : props.description
          )
        }
      ></input>
    ) : (
      textInput
    );

  const updateDeadline =
    buttonValue === "Update" ? (
      <input
        type="date"
        onChange={(e) => setDeadlineInput(e.target.value)}
      ></input>
    ) : (
      deadlineInput
    );

  if (props.taskCompletionStatus === true) {
    return (
      <tr>
        <td>
          <s>{description}</s>
        </td>
        <td>
          <s>{deadline}</s>
        </td>
        <td>
          <input
            type="checkbox"
            value={props.elementId}
            defaultChecked="checked"
            onChange={(e) => {
              e.target.checked = props.changeCheckBox(e.target.value);
            }}
          />
        </td>
        <td>
          <button>delete..</button>
        </td>
        <td>
          <button>Update</button>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{description}</td>
        <td>{deadline}</td>
        <td>
          <input
            type="checkbox"
            value={props.elementId}
            onChange={(e) => props.changeCheckBox(e.target.value)}
          />
        </td>
        <td>
          <button onClick={() => props.deleteItem(props.elementId)}>
            delete..
          </button>
        </td>
        <td>
          <button
            onClick={(e) => {
              setDescription(updateDescription);
              setDeadline(updateDeadline);
              console.log(e.target.textContent);
              setButtonValue(
                e.target.textContent === "Update"
                  ? "Upload"
                  : props.onUpdateItem(
                      props.elementId,
                      updateDescription,
                      updateDeadline
                    )
              );
            }}
          >
            {buttonValue}
          </button>
        </td>
      </tr>
    );
  }
}

export default TodoRows;
