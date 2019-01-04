let answer;
let hint;
let question;


$(document).ready(function () {




})


$("#forward").click(function () {
    $.ajax(
        {
            type: 'GET',
            url: '/flashcards',
            success: function (data) {
                console.log(data);
                let random = Math.floor(Math.random() * data.length)
                $("#question").html(data[random].question)
                answer = data[random].answer
                hint = data[random].hint
                console.log(data[random].answer)
                $("#answer").html("Answer")
                $("#hint").html("Hint")

            },
            error: function (err) {
                console.log(err)
            }

        }
    )
})

$('#flip').click(function () {
    $("#answer").html(answer)
})

$('#showHint').click(function () {
    $("#hint").html(hint)
})

// Attempt to delete data from collections
// $("#delete").click(function () {
//     $.ajax(
//         {
//             type: 'DELETE',
//             url: '/flashcards',
//             success: function (data) {
//                 console.log(data);
//                 let random = Math.floor(Math.random() * data.length)
//                 question = data[random].question
//                 answer = data[random].answer
//                 hint = data[random].hint
                

//             },
//             error: function (err) {
//                 console.log(err)
//             }

//         }
//     )
// })