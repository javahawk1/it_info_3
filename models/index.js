const Author = require("./author.model");
const Social = require("./social.model");
const Author_Social = require("./author_social.model");
const Dictionary = require("./dictionary.model");
const Synonym = require("./synonym.model");
const Description = require("./description.model");
const Category = require("./category.model");
const Topic = require("./topic.model");
const User = require("./user.model")
const Admin = require("./admin.model")

Author.belongsToMany(Social, { through: Author_Social, foreignKey: 'author_id', otherKey: 'social_id' });
Social.belongsToMany(Author, { through: Author_Social, foreignKey: 'social_id', otherKey: 'author_id' });

Author.hasMany(Author_Social, { foreignKey: 'author_id' });
Social.hasMany(Author_Social, { foreignKey: 'social_id' });

Author_Social.belongsTo(Author, { foreignKey: 'author_id' });
Author_Social.belongsTo(Social, { foreignKey: 'social_id' });

Dictionary.belongsToMany(Description, { through: Synonym, foreignKey: 'dict_id', otherKey: 'desc_id' });
Description.belongsToMany(Dictionary, { through: Synonym, foreignKey: 'desc_id', otherKey: 'dict_id' });

Dictionary.hasMany(Synonym, { foreignKey: 'dict_id' });
Description.hasMany(Synonym, { foreignKey: 'desc_id' });

Synonym.belongsTo(Dictionary, { foreignKey: 'dict_id' });
Synonym.belongsTo(Description, { foreignKey: 'desc_id' });

module.exports = {
    Author,
    Social,
    Author_Social,
    Dictionary,
    Synonym,
    Description,
    Category,
    Topic,
    User,
    Admin
};
