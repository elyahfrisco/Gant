import React, { useState } from "react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: "default-task",
      name: "Tâche par défaut",
      start: new Date("2024-07-01"),
      end: new Date("2024-07-10"),
      type: "task",
      progress: 100,
      styles: { backgroundColor: "#3498db" }
    }
  ]);

  const addTask = (values) => {
    const { taskName, plannedStart, plannedEnd, actualStart, actualEnd } = values;

    if (!plannedStart || !plannedEnd || !actualStart || !actualEnd) {
      console.error("Les dates fournies sont invalides.");
      return;
    }

    // Créer des objets de tâche conformes au modèle attendu
    const plannedTask = {
      id: `${taskName}-planned`,
      name: `${taskName} (Planifié)`,
      start: new Date(plannedStart),
      end: new Date(plannedEnd),
      type: "task",
      progress: 50,
      styles: { backgroundColor: "#3498db" }
    };

    const actualTask = {
      id: `${taskName}-actual`,
      name: `${taskName} (Réalisé)`,
      start: new Date(actualStart),
      end: new Date(actualEnd),
      type: "task",
      progress: 100,
      styles: { backgroundColor: "#2ecc71" }
    };

    // Ajouter les tâches à la liste existante
    setTasks((prevTasks) => [...prevTasks, plannedTask, actualTask]);
  };

  const validationSchema = Yup.object().shape({
    taskName: Yup.string().required("Nom de la tâche requis"),
    plannedStart: Yup.date().required("Début de la planification requis"),
    plannedEnd: Yup.date().required("Fin de la planification requis"),
    actualStart: Yup.date().required("Début de la réalisation requis"),
    actualEnd: Yup.date().required("Fin de la réalisation requis"),
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestion de Planning et Réalisation</h2>

      <div style={{ height: "400px", marginBottom: "20px" }}>
        <Gantt tasks={tasks} viewMode={ViewMode.Month} />
      </div>

      <div style={{ padding: "20px", background: "#f9f9f9", borderRadius: "5px" }}>
        <h3>Ajouter une Tâche</h3>
        <Formik
          initialValues={{
            taskName: "",
            plannedStart: "",
            plannedEnd: "",
            actualStart: "",
            actualEnd: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            addTask(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <label>Nom de la tâche :</label>
                  <Field name="taskName" type="text" placeholder="Démol. Escalier" />
                  <ErrorMessage name="taskName" component="div" style={{ color: "red" }} />
                </div>

                <div>
                  <label>Début Planification :</label>
                  <Field name="plannedStart" type="date" />
                  <ErrorMessage name="plannedStart" component="div" style={{ color: "red" }} />
                </div>

                <div>
                  <label>Fin Planification :</label>
                  <Field name="plannedEnd" type="date" />
                  <ErrorMessage name="plannedEnd" component="div" style={{ color: "red" }} />
                </div>

                <div>
                  <label>Début Réalisation :</label>
                  <Field name="actualStart" type="date" />
                  <ErrorMessage name="actualStart" component="div" style={{ color: "red" }} />
                </div>

                <div>
                  <label>Fin Réalisation :</label>
                  <Field name="actualEnd" type="date" />
                  <ErrorMessage name="actualEnd" component="div" style={{ color: "red" }} />
                </div>

                <button type="submit" style={{ backgroundColor: "#3498db", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                  Ajouter la Tâche
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default App;
