// 회원가입폼 데이터유효성 체크
$('.joinBox form').on('submit', function(){

    $('input').css({
        border:'1px solid #ddd'
    })


    // 아이디유효성체크 : 3~5글자 범위, 특수문자 제외
    var idbox = $('#idbox').val()
    if ( idbox.length>=3 && idbox.length<6 ) {
        for (var i=0; i<idbox.length; i++) {
            // p.128 참고
            var ch = idbox.charAt(i)
            if ( !(ch>='0' && ch<='9') && !(ch>='A' && ch<='Z') && !(ch>='a' && ch<='z')  ) {
                alert('특수문자는 포함하지 않음')
                $('#idbox').css({ 
                    border:'1px solid #f00'
                }).focus().select()
                return false
            } 
        }
    } else {
        alert('아이디는 3~5글자 범위입니다.')
        $('#idbox').css({ 
            border:'1px solid #f00'
        }).focus().select()
        return false
    }

    // 비밀번호 유효성체크 : 첫글자는 영문자만 허용하며, 숫자와 특수문자는 각각 1개 이상 포함
    // ^ : 첫문자일치, $ : 끝문자일치
    // ?= : 조건확인후 처음으로 돌아감
    // .  : 임의의 모든문자(숫자, 문자, 특수문자 포함한 모든 문자)
    // *  : 앞의 글자가 0번 이상 나올 수 있음
    var check = /^(?=[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).*$/
    var pwbox = $('#pwbox').val()
    if ( !check.test(pwbox) ) {
        alert('비밀번호 조건에 맞지 않습니다.')
        $('#pwbox').css({
            border:'1px solid #f00'
        }).focus().select()
        return false
    }

    var irum = $('#irum').val()
    var check2 = /^[가-힣]+$/
    if (irum.length>=2) {
        if ( !check2.test(irum) ) {
            alert('이름은 한글 두글자 이상입니다.')
            $('#irum').css({
                border:'1px solid #f00'
            }).focus().select()
            return false
        }
    } else {
        alert('이름은 한글 두글자 이상입니다.')
        $('#irum').css({
            border:'1px solid #f00'
        }).focus().select()
        return false
    }

    // 휴대폰번호 유효성체크 : 중간번호(숫자 3~4개), 끝번호(숫자 4개)
    var hp1 = $('#hp1').val()
    var hp2 = $('#hp2').val()
    var check3 = /^[0-9]{3,4}$/   
    var check4 = /^[0-9]{4}$/
    if ( !check3.test(hp1) ) {
        alert('번호형식이 맞지 않습니다.')
        $('#hp1').css({
            border:'1px solid #f00'
        }).focus().select()
        return false
    } else if (!check4.test(hp2)) {
        alert('번호형식이 맞지 않습니다.')
        $('#hp2').css({
            border:'1px solid #f00'
        }).focus().select()
        return false
    }

    // 이메일 아이디 유효성체크 : 특수문자제외
    var emailid = $('#emailid').val()
    var check5 = /^[a-zA-Z0-9]+$/
    if ( !check5.test(emailid) ) {
        alert('이메일 형식이 아닙니다.')
        $('#emailid').css({
            border:'1px solid #f00'
        }).focus().select()
        return false
    }

    // 이메일도메인 유효성체크 : 회사명.com, 회사명.co.kr
    var emaildo = $('#emaildomain').val()
    var check6 = /^[a-zA-Z0-9]+[\.][a-z]+([\.][a-z]+)*$/
    if ( emaildo !== '' ) {
        if ( !check6.test(emaildo) ) {
            alert('이메일형식이 틀립니다.')
            $('#emaildomain').css({
                border:'1px solid #f00'
            }).focus().select()
            return false
        }
    } else {
        alert('이메일도메인을 선택해주세요.')
        $('#emaildomain').css({
            border:'1px solid #f00'
        }).focus().select()
        return false
    }

    // 성별 선택 유효성체크 : 반드시 선택해야 함
    var gender = $('input[name=gender]:checked').length
    console.log(gender)
    if (gender === 0 ) {
        alert('성별을 선택해주세요.')
        $('input[name=gender]').focus()
        return false
    }






    return false // 테스트완료후에는 삭제할 것
})




$('#pwbox').on('focus', function(){
    $(this).after('<span>비밀번호 첫글자는 영문자이고, 숫자, 특수문자중 2가지 이상 조합해야 함<span>')
    $(this).next().css({
        color:'#f00', paddingLeft:'10px'
    })
})
$('#pwbox').on('blur', function(){
    $(this).next().remove()
})

$('#domainlist').on('change', function(){
    var doval = $('#domainlist option:selected').val()
    if ( doval !== 'noselect' && doval != 'self' ) {
        $('#emaildomain').val(doval)
    } else if ( doval === 'noselect') {
        $('#emaildomain').attr({
            disabled:true
        }).val('')
    } else {
        $('#emaildomain').attr({
            disabled:false
        }).val('')
    }
})

$('#all').on('click', function(){
    var bool = $(this).prop('checked')
    $('input[name^=co]').prop('checked', bool)




})

//남은글자 표시하기
$('#memo').on('keydown', function(){
    var curr = $(this).val().length
    var max = 10
    var remain = max - curr
    $('.remain').text(remain)
})


// 생년월일 칸에 datepicker 연결하기
$('#birth').datepicker({
    dateFormat:'yy-mm-dd',
    changeMonth:true,
    changeYear:true,
    yearRange:'1900:2021'
})
