import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({ day: "", month: "", year: "" });

  const [errors, setErrors] = useState({});
  const [output, setOutput] = useState({
    years: "--",
    months: "--",
    days: "--",
  });

  const handleSubmit = () => {
    const newErrors = {};

    // Check for errors in the input fields
    if (!formData.day) {
      newErrors.day = "The day field is required";
    } else {
      const dayNumber = parseInt(formData.day, 10);
      if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 31) {
        newErrors.day = "Enter a valid day between 1 and 31";
      }
    }

    if (!formData.month) {
      newErrors.month = "The day field is required";
    } else {
      const monthNumber = parseInt(formData.month, 10);
      if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        newErrors.month = "Enter a valid month between 1 and 12";
      }
    }

    if (!formData.year) {
      newErrors.year = "The day field is required";
    } else {
      const yearNumber = parseInt(formData.year, 10);
      if (isNaN(yearNumber)) {
        newErrors.year = "Enter a valid year";
      } else if (yearNumber < 1900 || yearNumber > new Date().getFullYear()) {
        newErrors.year = "Enter a valid year between 1900 and the current year";
      }
    }

    // if there are errors, update the state and prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // calculate age and update the output state
    const currentDate = new Date();
    const birthDate = new Date(
      `${formData.year}-${formData.month}-${formData.day}`
    );

    let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageInMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageInDays = currentDate.getDate() - birthDate.getDate();

    if (ageInDays < 0) {
      const lastMonthDays = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      ageInDays += lastMonthDays;
      ageInMonths -= 1;
    }

    if (ageInMonths < 0) {
      ageInMonths += 12;
      ageInYears -= 1;
    }

    setOutput({
      years: ageInYears,
      months: ageInMonths,
      days: ageInDays,
    });
  };

  const handleChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    // Clear the error for the field when the user starts typing again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  return (
    <div className="container">
      <Inputs
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <Output output={output} />
    </div>
  );
}

function Inputs({ formData, onChange, errors, onSubmit }) {
  return (
    <div className="input-flex">
      <div className="input-container">
        <span>Day</span>
        <input
          type="number"
          value={formData.day}
          onChange={(e) => onChange("day", e.target.value)}
        ></input>
        {errors.day && <small className="error-day">{errors.day}</small>}
      </div>

      <div className="input-container">
        <span>Month</span>
        <input
          value={formData.month}
          type="number"
          onChange={(e) => onChange("month", e.target.value)}
        ></input>
        {errors.month && <small className="error">{errors.month}</small>}
      </div>

      <div className="input-container">
        <span>Year</span>
        <input
          value={formData.year}
          type="number"
          onChange={(e) => onChange("year", e.target.value)}
        ></input>
        {errors.year && <small className="error">{errors.year}</small>}
      </div>
      <button className="submit-btn" onClick={onSubmit}>
        <div className="icon">⬇</div>
      </button>

      {errors.date && <p className="error">{errors.date}</p>}
    </div>
  );
}

// function Button() {
//   return (
//     <button className="submit-btn">
//       <div className="icon">⬇</div>
//     </button>
//   );
// }

function Output({ output }) {
  return (
    <div className="output">
      <h1>
        <span className="output-years">{output.years}</span>years
      </h1>
      <h1>
        <span className="output-month">{output.months}</span>months
      </h1>
      <h1>
        {" "}
        <span className="output-day">{output.days}</span>days
      </h1>
    </div>
  );
}
