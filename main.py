import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 1. Load data
df = pd.read_csv("train.csv")

# 2. Missing values handling (SMART WAY)
df['Age'] = df['Age'].fillna(df['Age'].median())
df['Embarked'] = df['Embarked'].fillna(df['Embarked'].mode()[0])

# drop column with too many missing values
df = df.drop(columns=['Cabin'])

# 3. Encoding categorical data
df['Sex'] = df['Sex'].map({'male': 0, 'female': 1})
df['Embarked'] = df['Embarked'].map({'S': 0, 'C': 1, 'Q': 2})

# 4. Feature Engineering ⭐
df['FamilySize'] = df['SibSp'] + df['Parch'] + 1

# 5. Features and target
X = df[['Pclass', 'Sex', 'Age', 'Fare', 'FamilySize', 'Embarked']]
y = df['Survived']

# 6. Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# 7. Model
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=6,
    random_state=42
)

# 8. Train
model.fit(X_train, y_train)

# 9. Predict
y_pred = model.predict(X_test)

# 10. Accuracy
acc = accuracy_score(y_test, y_pred)
print("Accuracy:", acc)

# 11. Feature importance (CV BONUS ⭐)
for name, score in zip(X.columns, model.feature_importances_):
    print(name, ":", score)

# 12. Save model (REAL PROJECT SKILL ⭐)
joblib.dump(model, "model.pkl")