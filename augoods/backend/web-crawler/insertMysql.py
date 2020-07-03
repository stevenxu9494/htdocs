from productObject import productJson
import pymysql

# 连接一个数据库
conn = pymysql.connect(
    host='localhost',  # mysql服务器地址
    port=3306,  # 端口号
    user='root',  # 用户名
    password='',  # 密码
    database='aumake'#,  # 数据库名称
    # charset='utf16',  # 连接编码，根据需要填写
)

# 创建一个游标
cursor = conn.cursor()

# sql语句

# 创建产品表
# sql = '''
# create table Products(
# productID int not null primary key auto_increment,
# id int,
# name varchar(200),
# price decimal(16,2),
# sellPrice decimal(16,2),
# brand varchar(50),
# category varchar(50),
# sales int,
# netWeight int,
# unit varchar(50),
# thumbUrl VARCHAR(2083),
# imageUrl VARCHAR(2083)
# )
# '''

# 删除所有数据
sql = "Truncate table Products"

try:
    # 执行sql语句
    count = cursor.execute(sql)

    # 打印
    print(count)

    # 提交事务
    conn.autocommit(True)

# 出现错误
except pymysql.Error as e:
    # 打印错误
    print(e)

    # 回滚
    conn.rollback()

# 插入所有数据
sql = "INSERT INTO Products (id,name,price,sellPrice,brand,category,sales,netWeight,unit,thumbUrl,imageUrl) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

for i in range(len(productJson)):
    singleVal = (int(productJson[i].id), str(productJson[i].name), float(productJson[i].price), float(productJson[i].sellPrice), str(productJson[i].brand), str(productJson[i].category), int(productJson[i].sales), int(productJson[i].netWeight), str(productJson[i].unit), str(productJson[i].thumbUrl), str(productJson[i].imageUrl))

    try:

        # 执行sql语句
        cursor.execute(sql, singleVal)

        # 取一行结果
        result = cursor.fetchone()

        # 提交事务
        conn.autocommit(True)

        # 打印
        print(result)

    # 出现错误
    except pymysql.Error as e:
        # 打印错误
        print(e)

        # 回滚
        conn.rollback()

conn.close()




