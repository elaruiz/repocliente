import Boom from 'boom';
import Models from '../models/';
const Configuration = Models.configuration;

export const getAllConfigurations = async (req, res) => {
    let totalPages = 1;
    let totalConfigs = 0;
    let itemsPerPage = req.query.size || 20;
    let page = req.query.page || 1;

    try {
        totalConfigs = await Configuration.count();
    } catch (e) {
    }

    totalPages = parseInt(totalConfigs / itemsPerPage);
    if (totalConfigs % itemsPerPage !== 0) {
        totalPages += 1;
    }

    return Configuration
        .findAll({
            offset: (page - 1) * itemsPerPage,
            limit: itemsPerPage,
        })
        .then(data => {
            res({
                data,
                meta: {
                    totalPages,
                    currentPage: page
                }
            }).code(200);
        })
        .catch(error => {
            res(Boom.badRequest(error));
        })
};

export const getConfiguration = (req, res) => {
    const { id } = req.params;

    return Configuration
        .findOne({
            where: { id }
        })
        .then(config => {
            if (!config) {
                return res(Boom.notFound('Not Found'));
            }
            return res(config).code(200);
        })
        .catch((error) => res(Boom.badRequest(error)));
};

export const createConfiguration = (req, res) => {
    const { name, type, value } = req.payload;
    Configuration.create({ name, type, value })
        .then(config => res({ data: config }).code(201))
        .catch(err => Boom.badRequest(err));
};

export const updateConfiguration = (req, res) => {
    return Configuration
        .update(req.payload, {where: {id: req.params.id}, returning:true})
        .then(config => res({data: config[1][0]}).code(200))
        .catch(error => res(Boom.badRequest(error)))
};

export const deleteConfiguration = (req, res) => {
    return Configuration
        .destroy({
            where: {id: req.params.id}
        })
        .then(success => res().code(204))
        .catch(error => res(Boom.badRequest(error)));
};