/* global describe, it */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  kronos = require('kronos-service-manager'),
  healthCheck = require('../healthCheck');

chai.use(require("chai-as-promised"));

describe('service manager admin', function () {

  function initManager() {
    return kronos.manager({
      services: {
        "health-check": {
          logLevel: "error"
        }
      }
    }).then(manager => {
      require('kronos-service-koa').registerWithManager(manager);

      healthCheck.registerWithManager(manager);
      return Promise.resolve(manager);
    });
  }

  describe('health', function () {
    it('GET /health', function (done) {
      initManager().then(function (manager) {
        const healthCheck = manager.services['health-check'];

        try {
          request(healthCheck.server.listen())
            .get('/health')
            .expect(200)
            .expect(function (res) {
              if (res.text !== 'OK') throw Error("not OK");
            })
            .end(done);
        } catch (e) {
          done(e);
        }
      }, done);
    });
  });
});
