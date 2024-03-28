const P = require('bluebird');
function getCollectionName(collection) {
    return collection && collection.s && collection.s.namespace && collection.s.namespace.collection;
}
function isSystemCollection(collection) {
    const collectionName = getCollectionName(collection);
    return collectionName && collectionName.startsWith('system.');
}
async function findCollectionMatchingSamples(databaseConnection, samples) {
    return P.mapSeries(databaseConnection.collections(), async (collection) => {
        if (isSystemCollection(collection))
            return null;
        const count = await collection.countDocuments({ _id: { $in: samples } });
        if (count) {
            return collection.s.namespace.collection;
        }
        return null;
    }).then(matches => matches.filter(match => match));
}
function filterReferenceCollection(referencedCollections) {
    return referencedCollections.length === 1 ? referencedCollections[0] : null;
}
module.exports = {
    findCollectionMatchingSamples,
    isSystemCollection,
    filterReferenceCollection,
    getCollectionName,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28tY29sbGVjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvbW9uZ28tY29sbGVjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTlCLFNBQVMsaUJBQWlCLENBQUMsVUFBVTtJQUNuQyxPQUFPLFVBQVUsSUFBSSxVQUFVLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztBQUNuRyxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxVQUFVO0lBQ3BDLE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JELE9BQU8sY0FBYyxJQUFJLGNBQWMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEUsQ0FBQztBQUVELEtBQUssVUFBVSw2QkFBNkIsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPO0lBQ3RFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUMsVUFBVSxFQUFDLEVBQUU7UUFDdEUsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNoRCxNQUFNLEtBQUssR0FBRyxNQUFNLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7U0FDMUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFRCxTQUFTLHlCQUF5QixDQUFDLHFCQUFxQjtJQUN0RCxPQUFPLHFCQUFxQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDOUUsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZiw2QkFBNkI7SUFDN0Isa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixpQkFBaUI7Q0FDbEIsQ0FBQyJ9