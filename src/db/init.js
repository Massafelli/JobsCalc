const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    // Cria as tabelas

    await db.exec(
      `CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      days_per_week INT,
      hours_per_day INT,
      vacation_per_year INT,
      value_hour INT
      )`
    );

    // Cria as tabelas
    await db.exec(`
    CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
    )
`);

    // Executa as querys
    await db.run(`
  INSERT INTO profile (
      name, 
      avatar,
      monthly_budget,
      hours_per_day,
      vacation_per_year,
      value_hour,
      days_per_week
      ) VALUES (
        'Leonardo',
        'https://avatars.githubusercontent.com/u/67658498?v=4',
        3000,
        5,
        4,
        70,
        5   
      );
`);

    await db.run(`
        INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
            ) VALUES(
                'Pizzaria Guloso',
                2,
                1,
                1637282097377
            )
`);
    await db.run(`
        INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
            ) VALUES(
                'OneTwo Project',
                3,
                47,
                1637282097377
            )
`);

    await db.close();
  },
};

initDb.init();
