/**
 * Created by alex on 01.12.2017.
 */

const rewireMobX = require('react-app-rewire-mobx');

module.exports = (config, env) => {
    config = rewireMobX(config, env);
    return config;
}