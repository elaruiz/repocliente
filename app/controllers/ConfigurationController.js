import Boom from 'boom';
import Models from '../models/';

const Configuration = Models.configuration;

export const verifyUniqueConf = (req, res) => {
    return Configuration
        .findOne({
            where: {
                name: req.payload.name
            }
        })
        .then(conf => {
            if (conf) {
                let error = Boom.badRequest('Ya existe esa variable');

                error.reformat();
                error.output.payload['validation'] = {
                    keys: ["name"]
                };

                return res(error);
            }
            res(req.payload);
        });
};

export const getAllConfigurations = async (req, res) => {
    let itemsPerPage = req.query.size || 20;
    let page = req.query.page || 1;

    return Configuration
        .findAndCountAll({
            offset: (page - 1) * itemsPerPage,
            limit: itemsPerPage,
        })
        .then(({ count, rows }) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            res({
                data: rows,
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
    Configuration.create({ name: `${name.toUpperCase()}`, type, value: `${value}` })
        .then(config => res({ data: config }).code(201))
        .catch(err => Boom.badRequest(err));
};

export const updateConfiguration = (req, res) => {
    return Configuration
        .update(req.payload, { where: { id: req.params.id }, returning: true })
        .then(config => res({ data: config[1][0] }).code(200))
        .catch(error => res(Boom.badRequest(error)))
};

export const deleteConfiguration = (req, res) => {
    return Configuration
        .destroy({
            where: { id: req.params.id }
        })
        .then(success => res().code(204))
        .catch(error => res(Boom.badRequest(error)));
};

export const findConfigurationByName = (req, res) => {
    return Configuration
        .findOne({ where: { name: req.params.name } })
        .then(config => {
            if(config !== null) {
                res(config.value).code(200)
            }else{
                res(Boom.notFound('Variable not found'));
            }
        })
        .catch(error => res(Boom.badRequest(error)))
};