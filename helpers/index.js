String.prototype.replaceAll = function(search, replacement) {
  return this.replace(new RegExp(search, "g"), replacement);
};

module.exports = {
  decodeIP: number => {
    String(number).replaceAll("0460", ".");
  },
  encodeIP: string => {
    return Number(string.replaceAll(".", "0460"));
  },
  isEmptyObject: object => {
    for (let prop in object) {
      return false;
    }
    return true;
  },
  updatePk: Model => {
    const tableName = Model.getTableName();
    Model.sequelize.query(`
    ALTER SEQUENCE public."${tableName}_id_seq" RESTART WITH 1 OWNED BY public."${tableName}".id;
    UPDATE public."${tableName}" SET id=nextval('public."${tableName}_id_seq"');
  `);
  },
  pingIps: Model => {
    Model.findAll().then(devices => {
      const promises = devices.map(device => {
        return new Promise(res => {});
      });

      Promise.all(promises).then(pingedDevices => {
        const data = devices.map((device, index) => {
          return { ...device, status: pingedDevices[index] };
        });
        console.log("4", data);
        return data;
      });
    });
  }
};
