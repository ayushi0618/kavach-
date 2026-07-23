import * as userService from '../services/userService.js';
export const getUsers = async (req, res, next) => { try { res.json(await userService.getAllUsers()); } catch (e) { next(e); } };
export const getUserById = async (req, res, next) => { try { res.json(await userService.getUserById(req.params.id)); } catch (e) { next(e); } };
export const createUser = async (req, res, next) => { try { res.status(201).json(await userService.createUser(req.body)); } catch (e) { next(e); } };
export const updateUser = async (req, res, next) => { try { res.json(await userService.updateUser(req.params.id, req.body)); } catch (e) { next(e); } };
export const deleteUser = async (req, res, next) => { try { res.json(await userService.deleteUser(req.params.id)); } catch (e) { next(e); } };
