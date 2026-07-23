import * as deptService from '../services/departmentService.js';
export const getDepartments = async (req, res, next) => { try { res.json(await deptService.getAllDepartments()); } catch (e) { next(e); } };
export const getDepartmentById = async (req, res, next) => { try { res.json(await deptService.getDepartmentById(req.params.id)); } catch (e) { next(e); } };
export const createDepartment = async (req, res, next) => { try { res.status(201).json(await deptService.createDepartment(req.body)); } catch (e) { next(e); } };
export const updateDepartment = async (req, res, next) => { try { res.json(await deptService.updateDepartment(req.params.id, req.body)); } catch (e) { next(e); } };
export const deleteDepartment = async (req, res, next) => { try { res.json(await deptService.deleteDepartment(req.params.id)); } catch (e) { next(e); } };
