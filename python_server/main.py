from flask import Flask, jsonify, request
from ChatBot import predictmodel
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/chatbot', methods=['POST'])
def chatResponse():
    reqData = request.get_json()
    print(reqData)
    return jsonify({'data': predictmodel.chatbot_response(reqData['userQuery'])})


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=3000)