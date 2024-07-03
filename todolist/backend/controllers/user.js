import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM todo";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO todo(`texto`, `categoria`) VALUES(?)";

  const values = [
    req.body.texto,
    req.body.categoria
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("todo criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE todo SET `texto` = ?, `categoria` = ? WHERE `id` = ?";

  const values = [
    req.body.texto,
    req.body.categoria
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Todo atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM todo WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Todo deletado com sucesso.");
  });
};
