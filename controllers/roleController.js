const Role = require("../models/role");

const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Please specify all the fields",
        success: false,
      });
    }

    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res
        .status(409)
        .json({ error: "Role already exists", success: false });
    }

    const newRole = new Role({
      name,
    });

    const savedRole = await newRole.save();

    res.status(200).json({
      data: savedRole,
      message: "Role add successful",
      success: true,
    });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({
      data: roles,
      success: true,
      message: "From Mongo",
    });
  } catch (error) {
    console.error("Error getting roles:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Please specify all the fields",
        success: true,
      });
    }
    const updatedRole = await Role.findOneAndUpdate(
      { _id: id },
      {
        name: name,
      },
      { new: true }
    );

    res.status(200).json({ data: updatedRole, success: true });
  } catch (error) {
    console.error("Error getting Roles:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRole = await Role.findOneAndUpdate(
      { _id: id },
      {
        deactivate: true,
      },
      { new: true }
    );

    res.status(200).json({
      data: deleteRole,
      success: true,
      message: "Role delete successful",
    });
  } catch (error) {
    console.error("Error getting Roles:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getAllDeactivatedRoles = async (req, res) => {
  try {
    const deactivatedRoles = await Role.find({
      deactivate: true,
    });
    res.status(200).json({ data: deactivatedRoles, success: true });
  } catch (error) {
    console.error("Error getting Roles:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const roles = await Role.findById(id);
    res.status(200).json({ data: roles, success: true });
  } catch (error) {
    console.error("Error getting roles:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
module.exports = {
  createRole,
  getAllRoles,
  updateRole,
  getAllDeactivatedRoles,
  deleteRole,
  getRoleById,
};
