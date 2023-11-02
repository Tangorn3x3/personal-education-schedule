export const JavaEntityFieldTypes = Object.freeze({
  Integer: { type: 'Integer', dbType: null },
  Long: { type: 'Long', dbType: null },
  String: { type: 'String', dbType: null },
  boolean: { type: 'boolean', dbType: null },
  StringUTF: { type: 'String', dbType: 'NVARCHAR2' },
  Date: { type: 'Date', dbType: null },
  Clob: { type: 'String', dbType: 'NCLOB' },
});

export const JavaEntityEnumTypes = Object.freeze({
  ORDINAL: "ORDINAL",
  STRING: "STRING"
});

export const JavaEntityFetchTypes = Object.freeze({
  LAZY: "LAZY",
  EAGER: "EAGER"
});

export const JavaEntityCascadeTypes = Object.freeze({
  ALL: { type: "ALL", desc: "ALL operations"  },
  PERSIST: { type: "PERSIST", desc: "PERSIST operation"  },
  MERGE: { type: "MERGE", desc: "MERGE operation"  },
  REMOVE: { type: "REMOVE", desc: "REMOVE operation"  },
  REFRESH: { type: "REFRESH", desc: "REFRESH operation"  },
  DETACH: { type: "DETACH", desc: "DETACH operation"  },
});

export const JavaCollectionTypes = Object.freeze({
  List: "List",
  Set: "Set"
});

export const EntityRelationTypes = Object.freeze({
  ManyToOne: { type: "ManyToOne", desc: "Относится к..",  cascadeType: JavaEntityCascadeTypes.ALL, reverseType: "OneToMany", },
  OneToMany: { type: "OneToMany", desc: "Имеет записи", cascadeType: JavaEntityCascadeTypes.ALL, reverseType: "ManyToOne", collectionType: JavaCollectionTypes.List},
  ManyToMany: { type: "ManyToMany", desc: "Много ко многим",  collectionType: JavaCollectionTypes.List }
});




