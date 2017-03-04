global virtual class DB_GenericDml {
    global virtual Database.UpsertResult[] doUpsert(List<SObject> objectList, Boolean allOrNone) {
    	return Database.upsert(objectList, allOrNone);
    }

    global virtual Database.UpsertResult[] doUpsert(List<SObject> objectList) {
    	return this.doUpsert(objectList, true);
    }
}